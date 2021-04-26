import { Card , CardContent , Typography } from '@material-ui/core'

function Infobox({nme,cases,total}) {
    return (
        <Card className="infobox">
            <CardContent>
                <Typography className="infobox_nme" color="textSecondary">{nme}</Typography>
                <h2 className="infobox_cases">{cases}</h2>
                <Typography className="infobox_total" color="textSecondVry">{total} Total</Typography>
            </CardContent>
        </Card>

    )
}

export default Infobox